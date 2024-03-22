using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Business.Abstract; // Adjust this namespace based on your actual structure
using DataAccess.Domains; // Adjust this namespace based on your actual structure
using DataAccess.DTOs.ToDoList;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization; // Adjust this namespace based on your actual structure

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


        [HttpPost]
        [Authorize(Roles = "userRole")]
        [Route("add/{UserId}")]
        public async Task<IActionResult> Add([FromBody] AddNewToDoListDTO toDoListDTO ,[FromRoute] string UserId )
        {
            var request = new ToDoList
            {
                Title = toDoListDTO.Title,
                Description = toDoListDTO.Description,
                UserId = UserId,
            };

            var result = await _toDoListService.AddAsync(request);
            
          

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete]
        [Authorize(Roles = "userRole")]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid Id)
        {
            var result = await _toDoListService.DeleteAsync(new ToDoList
            {
                Id = Id,
            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpPut]
        [Authorize(Roles = "userRole")]
        [Route("update/status/{Id:guid}")]
        public async Task<IActionResult> UpdateStatus([FromRoute] Guid Id, CompleteDTO toDoListDTO)
        {
            var result = await _toDoListService.UpdateStatusAsync(new ToDoList
            {
                Id = Id,
                //Title = toDoListDTO.Title,
                //Description = toDoListDTO.Description,
                IsCompleted = toDoListDTO.IsCompleted,
                
            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpPut]
        [Authorize(Roles = "userRole")]
        [Route("update/content/{Id:guid}")]
        public async Task<IActionResult> UpdateContent([FromRoute] Guid Id, UpdateToDoListDTO toDoListDTO)
        {
            var result = await _toDoListService.UpdateContentAsync(new ToDoList
            {
                Id = Id,
                Title = toDoListDTO.Title,
                Description = toDoListDTO.Description,
                //IsCompleted = toDoListDTO.IsCompleted,

            });

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }


        [HttpGet]
        [Authorize(Roles = "adminRole")]
        [Route("getAll")]
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


        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("add/{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _toDoListService.GetByIdAsync(id);
            if (result.Success)
            {
                var toDoListDTOs = new ToDoListDTO
                {
                    Id = result.Data.Id,
                    Title = result.Data.Title,
                    Description = result.Data.Description,
                    IsCompleted = result.Data.IsCompleted,
                    UserId = result.Data.UserId

                };
                return Ok(toDoListDTOs);
            }
            return BadRequest(result.Message);
        }

        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("userId/{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            var result = await _toDoListService.GetByUserIdAsync(userId);
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

        [HttpGet]
        [Authorize(Roles = "adminRole")]
        [Route("Completed")]
        public async Task<IActionResult> GetCompleted()
        {
            var result = await _toDoListService.GetCompletedAsync();
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

        [HttpGet]
        [Authorize(Roles = "adminRole")]
        [Route("NotCompleted")]
        public async Task<IActionResult> GetNotCompleted()
        {
            var result = await _toDoListService.GetNotCompletedAsync();
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

        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("Completed/{userId}")]
        public async Task<IActionResult> GetCompletedByUser([FromRoute] string userId)
        {
            var result = await _toDoListService.GetCompletedByUserIdAsync(userId);
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

        [HttpGet]
        [Authorize(Roles = "userRole")]
        [Route("NotCompleted/{userId}")]
        public async Task<IActionResult> GetNotCompletedByUser([FromRoute] string userId)
        {
            var result = await _toDoListService.GetNotCompletedByUserIdAsync(userId);
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

    }
}
