import React from "react";
import { Rnd } from "react-rnd";
import { Popover } from "@headlessui/react";
import { height, width } from "@mui/system";
import { PortraitSharp } from "@mui/icons-material";

function Element(props) {
  return (
    <Rnd
      default={{
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height,
      }}
      dragGrid={[props.size, props.size]}
      resizeGrid={[props.size, props.size]}
      bounds={"parent"}
     
      onDragStop={(e, d) => {
        var index = props.tables[props.roomNumber].Arr.findIndex(
          (x) => x.key == props.keyProp
        );

        let g = props.tables[props.roomNumber].Arr[index];

        g = {
          key: props.keyProp,
          x:
            d.x -
            (d.x % props.size > props.size / 2
              ? -(props.size - (d.x % 50))
              : d.x % props.size),
          y:
            d.y -
            (d.y % props.size > props.size / 2
              ? -(props.size - (d.y % 50))
              : d.y % props.size),
          width: props.width,
          height: props.height,
        };

        let copy = [...props.tables];
        copy[props.roomNumber].Arr[index] = g;
        props.setTables(copy);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        var index = props.tables[props.roomNumber].Arr.findIndex(
          (x) => x.key == props.keyProp
        );

        let g = props.tables[props.roomNumber].Arr[index];
        g = {
          key: props.keyProp,
          x: position.x,
          y: position.y,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        };

        let copy = [...props.tables];
        copy[props.roomNumber].Arr[index] = g;
        props.setTables(copy);
      }}
      className=" rounded-lg bg-orange-500 absolute z-10"
      onDoubleClick={() => props.setModalSelectedTable(props.index)}
    >
      {props.keyProp}
    </Rnd>
  );
}

export default Element;
