﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository _categoryRepo;
        private IUserProfileRepository _userRepo;

        public CategoryController(ICategoryRepository categoryRepo, IUserProfileRepository userRepo)
        {
            _categoryRepo = categoryRepo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            var categories = _categoryRepo.Get();
            return Ok(categories);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            List<Category> categories = _categoryRepo.GetAll();
            bool isActiveDupe = categories.Any(c => c.Name.ToLower() == category.Name.Trim().ToLower() && c.IsActive == true);

            if (!isActiveDupe)
            {
                foreach (Category c in categories)
                {
                    if (c.Name.ToLower() == category.Name.Trim().ToLower())
                    {
                        c.IsActive = true;
                        _categoryRepo.Update(c);
                        return Ok(c);
                    }
                }

                TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
                category.Name = textInfo.ToTitleCase(category.Name).Trim();
                category.IsActive = true;

                _categoryRepo.Add(category);
                return Ok(category);
            }

            return Conflict();
        }

        [HttpPut]
        public IActionResult Put(Category category)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            List<Category> categories = _categoryRepo.Get();
            foreach (Category c in categories)
            {
                if (c.Name.ToLower() == category.Name.Trim().ToLower())
                {
                    return Conflict();
                }
            }

            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
            category.Name = textInfo.ToTitleCase(category.Name).Trim();

            _categoryRepo.Update(category);
            return Ok(category);
        }

        [HttpPut("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            _categoryRepo.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
