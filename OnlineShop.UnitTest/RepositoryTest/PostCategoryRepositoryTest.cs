using Microsoft.VisualStudio.TestTools.UnitTesting;
using OnlineShop.Data.Infrastructure;
using OnlineShop.Data.Repositories;
using OnlineShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShop.UnitTest.RepositoryTest
{
    [TestClass]
    class PostCategoryRepositoryTest
    {
        IDbFactory dbFactory;
        IUnitOfWork unitOfWork;
        IPostCategoryRepository objRepository;

        [TestInitialize]
        public void Initialize()
        {
            dbFactory = new DbFactory();
            unitOfWork = new UnitOfWork(dbFactory);
            objRepository = new PostCategoryRepository(dbFactory);
        }

        [TestMethod]
        public void PostCategory_Repository_GetAll()
        {
            var list = objRepository.GetAll().ToList();
            Assert.AreEqual(1, list.Count);
        }

        [TestMethod]
        public void PostCategory_Repository_Create()
        {
            PostCategory category = new PostCategory();
            category.Name = "Test Category";
            category.Alias = "Test-category";
            category.Status = true;

            var result = objRepository.Add(category);
            unitOfWork.Commit();

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.ID);
        }
    }
}
