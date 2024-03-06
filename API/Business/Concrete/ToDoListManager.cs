using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Domains;

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
    public async Task<IResult> UpdateAsync(ToDoList toDoList)
    {
        await _toDoListDal.UpdateAsync(toDoList);
        return new SuccessResult("ToDoList updated successfully.");
    }
}