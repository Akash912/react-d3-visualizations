import PieChart from './visuals/PieChart/react-d3-piechart';
import {Container , Row , Col , Card} from 'react-bootstrap'

function App() {

  const pieData = [
    {
       "label":"pie1",
       "value":20,
       'tooltip':[
         {
           'label' : 'pie',
           'val1' : 100,
           'val2' : 30 
         }
       ]
    },
    {
       "label":"pie2",
       "value":80,
       'tooltip':[
         {
           'label' : 'pie',
           'val1' : 20,
           'val2' : 30 
         }
       ]
    },
    {
      "label":"pie3",
      "value":20,
      'tooltip':[
        {
          'label' : 'pie',
          'val1' : 50,
          'val2' : 30 
        }
      ]
   }
 ];



 const handleClick = () =>{
   alert('Define CallBack')
 }

  return (
    <div className="App">
      <header className="App-header">
        
        <Card style={{textAlign: '-WEBKIT-CENTER'}}>
          <Row>
            <Col md={{span:3}}>
            <h1>Pie Chart </h1>
            </Col>
            <Col md={{span:7}}>
               <PieChart 
                  data={pieData}
                  width={500}
                  height={500}
                  paddingAngle={0.01}
                  innerRadius={0}
                  color={['lightgrey','lightgrey','#B0D69B']}
                  click={handleClick}
                  textColor={'white'}
               />
            </Col>
          </Row>
        </Card>
        
      </header>
    </div>
  );
}

export default App;
