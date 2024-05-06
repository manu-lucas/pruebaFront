import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
export const GraphProject = () =>{
    const data = {
        datasets: [
          {
            data: [1,2,3],
            backgroundColor: [
              "rgba(0, 182, 155, 1)",
              "#FF7A00",
              "rgba(249, 60, 101, 1)",
            ],
            borderColor:[
                "rgba(0, 182, 155, 1)",
                "#FF7A00",
                "rgba(249, 60, 101, 1)",
            ]
          },
      
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: true,
        rotation: -90, 
        circumference: 180, 
         cutout: "65%",
         plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: '-',
            },
          },
      };
    return(
        <>
        <div className="graficoProyecto">
         <Doughnut data={data} options={options} />
        </div>
        </>
    )
}