import {useEffect, useState} from 'react';
import '../styles/UniCalendar.css';
import {UniCalendarEvents} from '../types/calendarTypes';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {useCalendarQuery} from '../hooks/useCalendarQuery';

const UniCalendar = () => {
  const [events, setEvents] = useState<UniCalendarEvents[]>([]);

  const {data} = useCalendarQuery();

  useEffect(() => {
    if (data?.data) {
      setEvents(data?.data.tableData);
    }
  }, [data?.data]);

  const headerToolbar = {
    start: 'Mart',
    center: 'title',
    end: 'prev,next'
  };

  const toolbarButtonHandler = (type: string, event: any) => {
    const title = event.target.title;
    if (event.target.classList.toString().includes('click')) {
      event.target.classList.add(`fc-${title}-button`);
      event.target.classList.remove(`fc-${title}-click-button`);
    } else {
      event.target.classList.add(`fc-${title}-click-button`);
      event.target.classList.remove(`fc-${title}-button`);
    }
    const abc: UniCalendarEvents[] = [{title: '김재현', start: '2023-11-13', type: 'M', _id: '125'}];
    setEvents(abc);
    // setIsEditable(!isEditable);
  };

  const customButtons = {
    Mart: {
      text: 'Mart',
      click: (event: any) => {
        toolbarButtonHandler('M', event);
      }
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleDateCellContent = (arg: any) => {
    const date = arg.date;
    const eventsItem = events.find((event: UniCalendarEvents) => event.start === formatDate(date));
    const isHoliDay = eventsItem?.type === 'H';
    return (
      <div className={`fc-daygrid-day-events fc-day-${isHoliDay ? eventsItem.type : 'N'}`}>
        <span>
          {isHoliDay ? eventsItem.title : ''}
          {arg.dayNumberText}
        </span>
      </div>
    );
  };

  const eventClick = (info: any) => {
    // TODO 모달창 띄우고 삭제, 수정 등
    console.log(info);
  };

  return (
    <FullCalendar
      initialView="dayGridMonth"
      locale={'ko'}
      plugins={[dayGridPlugin, interactionPlugin]}
      height={'80vh'} // 달력 높이
      editable={true}
      events={events}
      // eventContent={eventRender}
      eventClick={eventClick}
      headerToolbar={headerToolbar}
      customButtons={customButtons}
      dayCellContent={handleDateCellContent}
    />
  );
};

export default UniCalendar;
