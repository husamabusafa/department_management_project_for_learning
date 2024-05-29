import { Select, Text } from "@mantine/core";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
dayjs.extend(dayOfYear); 

export function TimeLine() {
  const [year, setYear] = useState("2023");
  const locale:any = "ltr";
  const ChevronOptionBack = {
    style: {
        color: "#351457",
        cursor: "pointer",
    },
    onClick:()=>{
        let currentYear = parseInt(year)
        setYear((currentYear-1).toString())
    }
  }
  const ChevronOptionForward = {
    style: {
        color: "#351457",
        cursor: "pointer",
    },
    onClick:()=>{
        let currentYear = parseInt(year)
        setYear((currentYear+1).toString())
    }
  }
  return (
    <div
    dir={locale == "ar" ? "rtl" : "ltr"}
      style={{
        width: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Task 1
      </h1>
      <div
        style={{
          width: "300px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 40px",
        }}
      >
        {locale == "ar" ? <IconChevronRight {...ChevronOptionBack} /> : <IconChevronLeft {...ChevronOptionBack}/>}
        <Text fz="lg">{year}</Text>
        {locale == "ar" ? <IconChevronLeft {...ChevronOptionForward}/> : <IconChevronRight {...ChevronOptionForward}/>}
      </div>
      <GanttChart departments={departments} year={year} locale={locale} />
    </div>
  );
}



const GanttChart = ({ departments, year, locale }) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const currentYear = dayjs().format("YYYY");
  const currentDayOfYear = dayjs().dayOfYear();
  const isCurrentYear = year === currentYear;

  const daysInYear = 365;
  const currentPosition = isCurrentYear
    ? (currentDayOfYear / daysInYear) * 100
    : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "calc(100% - 40px)",
          border: "2px solid rgba(33, 3, 63, 0.50)",
          borderRadius: "5px",
          height: "calc(100vh - 240px)",
          paddingTop: "30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "300px",
            textAlign: "center",
            height: "100%",
            color: "#7c7c7c",
          }}
        ></div>
        {months.map((month, index) => (
          <div
            key={index}
            style={{
              width: `calc((100% - 300px) / 12)`,
              textAlign: "center",
              borderRight: locale == "ar"?"1px solid #ccc":"none",
              borderLeft: locale == "ar"?"none":"1px solid #ccc",
              height: "100%",
              color: "#7c7c7c",
            }}
          >
            {month}
          </div>
        ))}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            paddingTop: "80px",
          }}
        >
          {/* Current date line */}
          <div
            style={{
              position: "absolute",
              width: "calc(100% - 300px)",
              height: "100%",
              top: "0",
              left:locale == "ar"? "0":undefined,
                right:locale == "ar"? undefined:"0",
              zIndex: "1",
            }}
          >
            {isCurrentYear && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: locale == "ar"? `calc(${currentPosition}% )`: undefined,
                    left: locale == "ar"? undefined: `calc(${currentPosition}% )`,
                  width: "2px",
                  height: "100%",
                  backgroundColor: "#21033F", // Distinct yellow color to stand out
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    transform: "translate(0, -50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                    backgroundColor: "#21033F",
                  }}
                />
                <div
                  style={{
                    transform: "translate(0, 50%)",

                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                    backgroundColor: "#21033F",
                  }}
                />
              </div>
            )}
          </div>
          {/* Current date line */}

          {departments
            ?.filter((department) =>
              department.programs.some((program) => {
                const programStartYear = parseInt(
                  program.start_date.split("-")[0],
                  10
                );
                const programEndYear = parseInt(
                  program.end_date.split("-")[0],
                  10
                );
                return programStartYear <= year && programEndYear >= year;
              })
            )
            .map((department, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0px",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    textAlign: "center",
                    height: "100%",
                    color: "#7c7c7c",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {department.name}
                  {/* git the sum */}
                  <Text
                    style={{
                      color: "#565656",
                      fontSize: "12px",
                      fontWeight: "500",
                      padding: "0px 10px 5px",
                    }}
                  >
                    applicants number:{" "}
                    {department.programs.reduce(
                      (acc, program) => acc + program.applicants_number,
                      0
                    )}
                  </Text>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "calc(100% - 300px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    height: "100%",
                  }}
                >
                  {department.programs
                    ?.filter((program) => {
                      const programStartYear = parseInt(
                        program.start_date.split("-")[0],
                        10
                      );
                      const programEndYear = parseInt(
                        program.end_date.split("-")[0],
                        10
                      );
                      return programStartYear <= year && programEndYear >= year;
                    })
                    .map((program) => {
                      const startDate = dayjs(program.start_date);
                      const endDate = dayjs(program.end_date);
                      const selectedYearStart = dayjs(`${year}-01-01`);
                      const selectedYearEnd = dayjs(`${year}-12-31`);

                      // Adjust start date if the program starts before the selected year
                      const adjustedStartDate = startDate.isBefore(
                        selectedYearStart
                      )
                        ? selectedYearStart
                        : startDate;

                      // Adjust end date if the program ends after the selected year
                      const adjustedEndDate = endDate.isAfter(selectedYearEnd)
                        ? selectedYearEnd
                        : endDate;

                      // Calculate total days from the adjusted start date to the adjusted end date
                      const totalDaysStartToEnd =
                        adjustedEndDate.diff(adjustedStartDate, "day") + 1;

                      // Calculate the offset from the start of the year to the adjusted start date
                      const daysFromStartOfYear = adjustedStartDate.diff(
                        selectedYearStart,
                        "day"
                      );

                      // Calculate left offset as a percentage of the width of the year
                      const leftOffset = `${
                        (daysFromStartOfYear / 365) * 100
                      }%`; // Assuming non-leap year for simplicity; adjust if necessary

                      // Calculate width as a percentage of the width of the year
                      const width = `${(totalDaysStartToEnd / 365) * 100}%`; // Adjust to total days in a year for simplicity

                      const endsThisYear =
                        endDate.isBefore(selectedYearEnd) ||
                        endDate.isSame(selectedYearEnd);
                      const startThisYear =
                        startDate.isAfter(selectedYearStart) ||
                        startDate.isSame(selectedYearStart);

                      // Set border radius based on whether the program ends this year
                      const borderRadius =locale == "ar"? ( !startThisYear
                        ? "10px 0px 0px 10px"
                        : endsThisYear
                        ? "10px 10px 10px 10px"
                        : "0px 10px 10px 0px"):
                        ( !startThisYear
                          ? "0px 10px 10px 0px"
                          : endsThisYear
                          ? "10px 10px 10px 10px"
                          : "10px 0px 0px 10px")
                        ; // Adjusts right-side radius to 0 if continuing
                      return (
                        <div
                          key={program.id}
                          style={{
                            right: locale == "ar"?leftOffset:undefined,
                            left: locale == "ar"?undefined:leftOffset,
                            width: width,
                            position: "absolute",
                            backgroundColor:
                              program.status === "ongoing"
                                ? "#FFB004"
                                : program.status === "completed"
                                ? "#5BC993"
                                : "#DE8C86",
                            borderRadius: borderRadius,
                            height: "50px",
                            textAlign: "center",
                            lineHeight: "50px",
                            color: "white",
                          }}
                        >
                          {program.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const departments = [
    {
        name: "Research and Development",
        description: "",
        id: "dep001",
        order: 1,
        created_at: "2022-01-01T00:00:00Z",
        programs: [
        {
            name: "Advanced Materials",
            id: "prog002",
            start_date: "2022-03-01T00:00:00Z",
            end_date: "2022-09-30T00:00:00Z",
            applicants_number: 180,
            status: "ongoing",
        },
        {
            name: "Advanced Materials",
            id: "prog002",
            start_date: "2023-03-01T00:00:00Z",
            end_date: "2024-05-30T00:00:00Z",
            applicants_number: 180,
            status: "ongoing",
        },
        ],
    },
    {
        name: "Marketing",
        id: "dep002",
        order: 2,
        created_at: "2022-01-15T00:00:00Z",
        programs: [
        {
            name: "Brand Expansion",
            id: "prog003",
            start_date: "2022-03-01T00:00:00Z",
            end_date: "2022-06-01T00:00:00Z",
            applicants_number: 150,
            status: "cancel",
        },
        ],
    },
    {
        name: "Human Resources",
        id: "dep003",
        order: 3,
        created_at: "2022-02-10T00:00:00Z",
        programs: [
        {
            name: "Leadership Training",
            id: "prog004",
            start_date: "2022-04-21T00:00:00Z",
            end_date: "2022-07-01T00:00:00Z",
            applicants_number: 90,
            status: "completed",
        },
        ],
    },
    {
        name: "Information Technology",
        id: "dep004",
        order: 4,
        created_at: "2022-03-05T00:00:00Z",
        programs: [
        {
            name: "Cybersecurity Update",
            id: "prog005",
            start_date: "2023-01-15T00:00:00Z",
            end_date: "2023-04-15T00:00:00Z",
            applicants_number: 120,
            status: "cancel",
        },
        {
            name: "Software Development Course",
            id: "prog006",
            start_date: "2023-05-01T00:00:00Z",
            end_date: "2023-08-01T00:00:00Z",
            applicants_number: 100,
            status: "cancel",
        },
        ],
    },
    ];
