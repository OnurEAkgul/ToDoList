using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Business.Abstract; // Adjust this namespace based on your actual structure
using DataAccess.Domains; // Adjust this namespace based on your actual structure
using DataAccess.DTOs.ToDoList; // Adjust this namespace based on your actual structure

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly IToDoListService _toDoListService;

        public ToDoListController(IToDoListService toDoListService)
        {
            _toDoListService = toDoListService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _toDoListService.GetAllAsync();
            if (result.Success)
            {
                var toDoListDTOs = result.Data
                    .Select(entity => new ToDoListDTO
                    {
                        Id = entity.Id,
                        Title = entity.Title,
                        Description = entity.Description,
                        IsCompleted = entity.IsCompleted,
                        UserId = entity.UserId
                    });

                return Ok(toDoListDTOs);
            }
            return BadRequest(result.Message);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ToDoListDTO toDoListDTO)
        {
            var result = await _toDoListService.AddAsync(new ToDoList
            {
                Id = toDoListDTO.Id,
                Title = toDoListDTO.Title,
                Description = toDoListDTO.Description,
                IsCompleted = toDoListDTO.IsCompleted,
                UserId = toDoListDTO.UserId
            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] ToDoListDTO toDoListDTO)
        {
            var result = await _toDoListService.DeleteAsync(new ToDoList
            {
                Id = toDoListDTO.Id,
                Title = toDoListDTO.Title,
                Description = toDoListDTO.Description,
                IsCompleted = toDoListDTO.IsCompleted,
                UserId = toDoListDTO.UserId
            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] ToDoListDTO toDoListDTO)
        {
            var result = await _toDoListService.UpdateAsync(new ToDoList
            {
                Id = toDoListDTO.Id,
                Title = toDoListDTO.Title,
                Description = toDoListDTO.Description,
                IsCompleted = toDoListDTO.IsCompleted,
                UserId = toDoListDTO.UserId
            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
