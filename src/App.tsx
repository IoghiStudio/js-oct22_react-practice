/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

// import { Category } from './types/category';
// import { Product } from './types/product';
// import { User } from './types/user';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

const findByOwnerId = (id: number) => {
  return usersFromServer.find(user => user.id === id);
};

const categories = categoriesFromServer.map(category => {
  return {
    id: category.id,
    title: category.title,
    icon: category.icon,
    owner: findByOwnerId(category.ownerId),
  };
});

const findByCategoryId = (id: number) => {
  return categories.find(category => category.id === id);
};

const productsList = productsFromServer.map(product => {
  return {
    id: product.id,
    name: product.name,
    category: findByCategoryId(product.categoryId),
  };
});

export const App: React.FC = () => {
  const [products, setProducts] = useState(productsList);
  const [users] = useState(usersFromServer);
  const [activeUser, setActiveUser] = useState(users[users.length]);
  const [filterByAll, setFilterByAll] = useState(true);

  let visibleProducts = products;

  if (activeUser !== users[users.length]) {
    visibleProducts = products.filter(product => {
      return product.category?.owner?.id === activeUser.id;
    });
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': filterByAll === true,
                })}
                onClick={() => {
                  setFilterByAll(true);
                  setActiveUser(users[users.length]);
                }}
              >
                All
              </a>

              {users.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': activeUser === user,
                  })}
                  onClick={() => {
                    setActiveUser(user);
                    setFilterByAll(false);
                  }}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map(product => {
                const { id, name, category } = product;

                return (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">
                      {category?.icon}
                      {' - '}
                      {category?.title}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-danger': category?.owner?.sex === 'f',
                        'has-text-link': category?.owner?.sex === 'm',
                      })}
                    >
                      {product.category?.owner?.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
