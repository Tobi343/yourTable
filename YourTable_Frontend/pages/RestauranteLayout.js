import React from "react";
import { DragDropContext, Droppable, Draggable,resetServerContext  } from "react-beautiful-dnd";

function RestauranteLayout() {


  const arr = [
    {
      Name: "Meris Bihorac",
      id: "0",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3",
    },
    {
      Name: "Meris Bihorac",
      id: "1",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3",
    },
    {
      Name: "Meris Bihorac",
      id: "2",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A34",
    },
    {
      Name: "Meris Bihorac",
      id: "3",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A345",
    },
    {
      Name: "Meris Bihorac",
      id: "4",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3454",
    },
  ];

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    //const items = Array.from(characters);
    //const [reorderedItem] = items.splice(result.source.index, 1);
    //items.splice(result.destination.index, 0, reorderedItem);

   // updateCharacters(items);
  }

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    
  }
  
  return (
     <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {arr.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-red-100 m-3"
                    >
                      {item.Name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  );


}

export default RestauranteLayout;
