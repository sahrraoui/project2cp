import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        if (selectedDates.includes(dateString)) {
            setSelectedDates(selectedDates.filter(date => date !== dateString));
        } else {
            setSelectedDates([...selectedDates, dateString]);
        }
    };

    const renderCalendar = (date) => {
        const daysInMonth = getDaysInMonth(date);
        const firstDayOfMonth = getFirstDayOfMonth(date);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <div 
                    key={`empty-${i}`} 
                    className="empty-cell"
                />
            );
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
            const isSelected = selectedDates.includes(dateString);
            days.push(
                <div
                    key={day}
                    className={`day-cell ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    // Get next month for display
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button 
                    className="month-navigation"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <div className="months-display">
                    <div>
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>
                    <div className="next-month">
                        {months[nextMonth.getMonth()]} {nextMonth.getFullYear()}
                    </div>
                </div>
                <button 
                    className="month-navigation"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
            </div>
            
            <div className="calendars-container">
                <div className="calendar-grid">
                    <div className="weekdays-grid">
                        {daysOfWeek.map(day => (
                            <div key={day} className="weekday">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="days-grid">
                        {renderCalendar(currentDate)}
                    </div>
                </div>

                <div className="calendar-grid">
                    <div className="weekdays-grid">
                        {daysOfWeek.map(day => (
                            <div key={`next-${day}`} className="weekday">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="days-grid">
                        {renderCalendar(nextMonth)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar; 