import React, { useState} from 'react';
import { Steps } from 'antd';
import 'antd/dist/antd.css';


const { Step } = Steps;
const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  // background: 'white'
};
export default function TravelSteps(props) {
  const [current, setCurrent] = useState(0);
  // onChange = current => {
  //   console.log('onChange:', current);
  //   setCurrent(current);
  // };
  const wayPoints = props.megaSteps.map((step) => {
    const startName = props.places.filter((places) => {
      return places.address.substring(0, 10) == step.start_address.substring(0, 10)
    })[0].name

    const endName = props.places.filter((places) => {
      return places.address.substring(0, 10) == step.end_address.substring(0, 10)
    })[0].name

    step['startName'] = startName
    step['endName'] = endName
    return step
  })

  const wayPoinstWithDuration = wayPoints.map((wayPoint) => {
    const targetStep = props.steps.filter((step) => {
      if (wayPoint.start_address.substring(0, 10) == step.start_address.substring(0, 10)) {
        return true
      } else {
        return false
      }
    })[0]
    wayPoint['distance'] = targetStep.distance.text
    wayPoint['duration'] = targetStep.duration.text
    return wayPoint
  })

  console.log('result waypoints with name')
  console.log(wayPoinstWithDuration)
  console.log(props.targetMap.getCenter)
  // after routes loaded on map, center the map
  const initMapcenter = {lat: wayPoinstWithDuration[0].start_location.lat(), lng:  wayPoinstWithDuration[0].start_location.lng()}
  
  props.targetMap.setCenter(initMapcenter)
  // props.targetMap
  props.targetMap.setZoom(5)
  
  const lastRoute = wayPoinstWithDuration[wayPoinstWithDuration.length-1]
    return (
      <div>
        {/* <Steps
          type="navigation"
          size="small"
          current={current}
          onChange = {current => {
            console.log('onChange:', current);
            setCurrent(current);
          }
        }
          style={stepStyle}
        >
          <Step
            title="Canada Place"
            subTitle="00:00:05"
            status="finish"
            description="Do I want to go there?"
          />
          <Step
            title="Step 2"
            subTitle="00:01:02"
            status="process"
            description="This is a description."
          />
          <Step
            title="Step 3"
            subTitle="waiting for longlong time"
            status="wait"
            description="This is a description."
          />
        </Steps> */}
        <Steps type="navigation" current={current}  
        onChange = {current => {
            // console.log('onChange:', current);
            setCurrent(current);
          }
        } 
        style={stepStyle}>
          {wayPoinstWithDuration.map((wayPoint) => {
            return <Step status="finish" title={wayPoint.startName} description={`Time to next destination: ${wayPoint.duration} Distance: ${wayPoint.distance}`}/>
          })
          }
          {<Step status="finish" title={lastRoute.endName} description={`Final destination`}/>}
          {/* <Step status="wait" title="Step 2" />
          <Step status="wait" title="Step 3" />
          <Step status="wait" title="Step 4" /> */}


        </Steps>
        {/* <Step status="finish" title="Step 1" />
          <Step status="process" title="Step 2" />
          <Step status="wait" title="Step 3" />
          <Step status="wait" title="Step 4" />
        </Steps> */}
        {/* <Steps
          type="navigation"
          size="small"
          current={current}
          onChange = {current => {
            console.log('onChange:', current);
            setCurrent(current);
          }
        }
        style={stepStyle}
        >
          <Step status="finish" title="finish 1" />
          <Step status="finish" title="finish 2" />
          <Step status="process" title="current process" />
          <Step status="wait" title="wait" disabled />
        </Steps> */}
      </div>
    );
}




