import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startFetchEvents } from '../actions'
import Event from '../components/Event'

class EventsMonitor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(startFetchEvents())
  }

  componentWillReceiveProps(nextProps) {
    const { events, dispatch } = nextProps
    if (events.isFetching === false) {
      dispatch(startFetchEvents())
    }

  }

  handleChange(nextHandler) {
    this.props.dispatch()
  }

  handleRefreshClick(e) {
    e.preventDefault()
  }

  render() {
    var data = this.props.events.data
    var processedData = [];
    for (var i in data) {
      if (data.hasOwnProperty(i)){
        for (var j in data[i]) {
          if (data[i].hasOwnProperty(j)) {
            var d = {
              id: j,
              event: data[i][j]
            }
            processedData.push(d);
          }
        }
      }
    }
    var monitorStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30vh',
      backgroundColor: '#97c787',
      overflow: 'scroll',
      opacity: '0.5'
    }
    console.log('Processed data is ', processedData)
    processedData.reverse()
    return (
      <div className="events-monitor" style={monitorStyle}>
      {processedData.map((event, i) =>
        <Event key={event.id} event={event}/>
      )}
      </div>
    )
  }
}

export default connect()(EventsMonitor);