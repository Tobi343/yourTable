import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import Element from "./components/DragAndDrop/Element";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
function RestauranteLayout() {
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  }

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

  const currentDate = '2018-11-01';
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    //const items = Array.from(characters);
    //const [reorderedItem] = items.splice(result.source.index, 1);
    //items.splice(result.destination.index, 0, reorderedItem);

    // updateCharacters(items);
  }
  return (
    <Paper>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}

export default RestauranteLayout;
