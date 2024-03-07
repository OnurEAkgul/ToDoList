using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Domains;
using System.Linq.Expressions;

public class ToDoListManager : IToDoListService
{
    private readonly IToDoListDAL _toDoListDal;

    public ToDoListManager(IToDoListDAL toDoListDal)
    {
        _toDoListDal = toDoListDal;
    }

    public async Task<IResult> AddAsync(ToDoList toDoList)
    {
        await _toDoListDal.AddAsync(toDoList);
        return new SuccessResult("ToDoList added successfully.");
    }
    public async Task<IResult> DeleteAsync(ToDoList toDoList)
    {
        await _toDoListDal.DeleteAsync(toDoList);
        return new SuccessResult("ToDoList deleted successfully.");
    }
    public async Task<IDataResult<List<ToDoList>>> GetAllAsync()
    {
        var toDoLists = await Task.Run(() => _toDoListDal.GetAllAsync());
        return new SuccessDataResult<List<ToDoList>>(toDoLists, "ToDoLists retrieved successfully.");
    }
    public async Task<IResult> UpdateStatusAsync(ToDoList toDoList)
    {
        var existingToDoList = await _toDoListDal.GetAsync(t => t.Id == toDoList.Id);
        if (existingToDoList == null)
        { 
            return new ErrorResult("ToDoList not found.");
        }
        existingToDoList.IsCompleted = toDoList.IsCompleted;
        await _toDoListDal.UpdateAsync(existingToDoList);
        return new SuccessResult("ToDoList updated successfully.");
    }
    public async Task<IResult> UpdateContentAsync(ToDoList toDoList)
    {
        var existingToDoList = await _toDoListDal.GetAsync(t => t.Id == toDoList.Id);
        if (existingToDoList == null)
        {
            return new ErrorResult("ToDoList not found.");
        }
        existingToDoList.IsCompleted = toDoList.IsCompleted;
        existingToDoList.Description = toDoList.Description;
        existingToDoList.Title = toDoList.Title;
        await _toDoListDal.UpdateAsync(existingToDoList);
        return new SuccessResult("ToDoList updated successfully.");
    }
    public async Task<IDataResult<List<ToDoList>>> GetByFilterAsync(Expression<Func<ToDoList, bool>> filter)
    {
        try
        {
            var filteredList = await _toDoListDal.GetAllAsync(filter);
            return new SuccessDataResult<List<ToDoList>>(filteredList, "Filtered ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving filtered ToDoList items: {ex.Message}");
        }
    }
    public async Task<IDataResult<ToDoList>> GetByIdAsync(Guid id)
    {
        try
        {
            var toDoList = await _toDoListDal.GetAsync(t => t.Id == id);
            return toDoList != null
                ? new SuccessDataResult<ToDoList>(toDoList, "ToDoList item retrieved successfully.")
                : new ErrorDataResult<ToDoList>(null, "ToDoList item not found.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<ToDoList>(null, $"Error while retrieving ToDoList item: {ex.Message}");
        }
    }
    public async Task<IDataResult<List<ToDoList>>> GetByUserIdAsync(string userId)
    {
        try
        {
            var toDoLists = await _toDoListDal.GetAllAsync(t => t.UserId == userId);
            return new SuccessDataResult<List<ToDoList>>(toDoLists, "ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving ToDoList items: {ex.Message}");
        }
    }
    public async Task<IDataResult<List<ToDoList>>> GetCompletedAsync()
    {
        try
        {
            var completedToDoLists = await _toDoListDal.GetAllAsync(t => t.IsCompleted);
            return new SuccessDataResult<List<ToDoList>>(completedToDoLists, "Completed ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving completed ToDoList items: {ex.Message}");
        }
    }
    public async Task<IDataResult<List<ToDoList>>> GetNotCompletedAsync()
    {
        try
        {
            var notCompletedToDoLists = await _toDoListDal.GetAllAsync(t => !t.IsCompleted);
            return new SuccessDataResult<List<ToDoList>>(notCompletedToDoLists, "Not completed ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving not completed ToDoList items: {ex.Message}");
        }
    }

    public async Task<IDataResult<List<ToDoList>>> GetCompletedByUserIdAsync(string userId)
    {
        try
        {
            var toDoLists = await _toDoListDal.GetAllAsync(t => t.UserId == userId && t.IsCompleted);
            return new SuccessDataResult<List<ToDoList>>(toDoLists, "ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving ToDoList items: {ex.Message}");
        }
    }
    public async Task<IDataResult<List<ToDoList>>> GetNotCompletedByUserIdAsync(string userId)
    {
        try
        {
            var toDoLists = await _toDoListDal.GetAllAsync(t => t.UserId == userId && !t.IsCompleted);
            return new SuccessDataResult<List<ToDoList>>(toDoLists, "ToDoList items retrieved successfully.");
        }
        catch (Exception ex)
        {
            return new ErrorDataResult<List<ToDoList>>(null, $"Error while retrieving ToDoList items: {ex.Message}");
        }
    }
}