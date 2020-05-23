var p = MindFusion.Scheduling;

//create a new calendar instance
var calendar = new p.Calendar(document.getElementById("calendar"));

calendar.theme = "blue";

calendar.selectionEnd.addEventListener(handleSelection);
calendar.headerClick.addEventListener(handleHeaderClick);

//visualize the calendar
calendar.render();

function handleHeaderClick(sender, args)
{
	if(sender.currentView === p.CalendarView.Timetable)
	{
		sender.date = sender.timetableSettings.dates.items()[0];
		sender.currentView = p.CalendarView.SingleMonth;
	}
}

function handleSelection(sender, args)
{
	if(sender.currentView === p.CalendarView.SingleMonth)
	{
		//cancel the default behavior
		args.cancel = true;
		
		var start = args.startTime;
		var end = args.endTime;
		
		//clear all dates from the timetable
		sender.timetableSettings.dates.clear();
		
		while(start < end)
		{
			sender.timetableSettings.dates.add(start);
			start = p.DateTime.addDays(start, 1);
			
		}
		
		sender.currentView = p.CalendarView.Timetable;
	}
};
//questions on the local storage//
for (let i = 0; i < localStorage.length; i++){
	const calender = localStorage.setItem.calendar[i];
	lsOutput.innerhtml += '${calender}';

	calender.render();
}
