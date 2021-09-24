import React from "react";

function TableItem() {
  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div class="flex items-center">
          <div class="ml-3">
            <p class="text-gray-900 whitespace-no-wrap">Vera Carpenter</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">Admin</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span class="relative">Activo</span>
        </span>
      </td>
    </tr>
  );
}

export default TableItem;
