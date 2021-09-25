import React from "react";

function TableItem(props) {
  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div class="flex items-center">
          <div class="ml-3">
            <p class="text-gray-900 whitespace-no-wrap">{props.Name}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">{props.Anzahl}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">{props.Uhrzeit}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">{props.Tischnummer}</p>
      </td>
    </tr>
  );
}

export default TableItem;
