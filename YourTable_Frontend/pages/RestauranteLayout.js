import React from "react";
import { DragDropContext, Droppable, Draggable,resetServerContext  } from "react-beautiful-dnd";

function RestauranteLayout() {
  const arr = [
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3",
    },
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A34",
    },
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A345",
    },
    {
      Name: "Meris Bihorac",
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
  resetServerContext()

  return (
    <div>
     <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.ref}>
                {arr.map(({Name, Anzahl, Uhrzeit, Tischnummer}, index) => {
                  return (
                    <Draggable key={Tischnummer} draggableId={Tischnummer} index={index}>
                      {(provided) => (
                        <li ref={provided.ref} {...provided.draggableProps} {...provided.dragHandleProps}>

                          <p>
                            { Name + ": "+Tischnummer}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );


}

export default RestauranteLayout;
