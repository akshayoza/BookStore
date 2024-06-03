import React from "react";

function AdminCards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <p title={item.title} className="truncate cursor-pointer">{item.title}</p>
            <div className="card-actions flex justify-between">
              <div className="badge badge-outline">${item.price}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCards;
