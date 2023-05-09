import React, { useState } from 'react'

const List = ({ Items }) => {
  const [activeIndex, setActiveIndex] = useState(false)
  console.log("Items recieved : ", Items)

  const getTimes = (time) => {
    // change PT2H30M to 2h 30m
    let hours = time.slice(2, time.indexOf('H'))
    let minutes = time.slice(time.indexOf('H') + 1, time.indexOf('M'))
    return `${hours}h ${minutes}m`
  }

  const getDates = (date) => {
    // change 2023-05-17T16:35:00 to 17-05-2023 16:35
    let day = date.slice(8, 10)
    let month = date.slice(5, 7)
    let year = date.slice(0, 4)
    let time = date.slice(11, 16)
    return `${day}-${month}-${year} ${time}`
  }


  if (Object.keys(Items)[0] === "error") return (<>
    {(Items.error.response.result.errors[0].title) ? "loading... if itakes too long please try again" : null}
  </>)
  return (
    <>
      <div className='ui header'>
        Available Offers
      </div>
      <div className='ui divider'></div>
      <div>
        {
          Items.map((item, index) => {
            console.log(item)
            return (
              <div className='ui segment' key={index}>
                <div className='ui content'>
                  <div className='ui header'>
                    <strong>Price : </strong>{item.price.total}({item.price.currency})
                  </div>
                  <div className='ui meta'> Available Seats : {item.numberOfBookableSeats}</div>
                  <div className='ui divider'></div>
                  <div className='ui content'>
                    <h4 className='ui header'>
                      Itineraries :
                    </h4>
                    <div>Duration: {getTimes(item.itineraries[0].duration)}</div>
                    <div>
                      <div className='ui title'
                        onClick={() => setActiveIndex(!activeIndex)}>
                        <i className='dropdown icon'></i>
                        Segments : {item.itineraries[0].segments.length}
                      </div>
                      <div hidden={activeIndex} className='ui segment content'>
                        {
                          item.itineraries[0].segments.map((segment, index) => {
                            return (
                              <div key={index}>
                                <div>Departure : {segment.departure.iataCode} - {getDates(segment.departure.at)}</div>
                                <div>Arrival : {segment.arrival.iataCode} - {getDates(segment.arrival.at)}</div>
                                <div>Carrier : {segment.carrierCode}</div>
                                <div>Flight Number : {segment.number}</div>
                                <div>Duration : {getTimes(segment.duration)}</div>
                                {index !== item.itineraries[0].segments.length - 1 && <div className='ui divider'></div>}
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default List