import Chart1 from '../components/Verso/Chart1';
import Chart2 from '../components/Verso/Chart2';
import Chart3 from '../components/Verso/Chart3';
import "./css/Verso.css";

function Verso() {

    return (
        <>
            <div className="main">

            <Chart1 />
            <Chart2 />
                <Chart3 />

            </div>
        </>
    );
}

export default Verso;