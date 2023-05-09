import React, { useEffect, useState } from 'react'

const SearchForm = ({ setData, searchTrigger }) => {
  const [originCode, setOriginCode] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const [dateOfDeparture, setDateOfDeparture] = useState(new Date().toISOString().slice(0,10))

  const [originList, setOriginList] = useState([])
  const [destinationList, setDestinationList] = useState([])
  const [ListVisible, setListVisible] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()

    const iotaOrigin = originCode.slice(0, originCode.indexOf('-')).trim();
    const iotaDestination = destinationCode.slice(0, destinationCode.indexOf('-')).trim();
    
    if(dateOfDeparture < new Date().toISOString().slice(0,10)){
      setDateOfDeparture(new Date().toISOString().slice(0,10))
    }

    setData({
      originCode: iotaOrigin,
      destinationCode: iotaDestination,
      dateOfDeparture,
      adults: '1'
    });
    searchTrigger()
  }
  const handleDateChange = (e) => {
    const Today = new Date();
    const DepartureDate = new Date(e.target.value);
    console.log(e.target.value)
    if (DepartureDate < Today) {
      setDateOfDeparture(new Date());
    } else {
      setDateOfDeparture(e.target.value);
    }
  }

  useEffect(() => {
    if (originCode.length < 3) {
      setOriginList([])
      return;
    }
    // console.log("searching suggestion for ", originCode)
    fetch(`http://localhost:4000/api/city-search/${originCode}`)
      .then(res => res.json())
      .then(data => setOriginList(data))
      .catch(err => console.log(err))
  }, [originCode])

  useEffect(() => {
    if (destinationCode.length < 3) {
      setDestinationList([])
      return;
    }
    // console.log("searching suggestion for ", destinationCode)
    fetch(`http://localhost:4000/api/city-search/${destinationCode}`)
      .then(res => res.json())
      .then(data => setDestinationList(data))
      .catch(err => console.log(err))
  }, [destinationCode])

  return (
    <div className='ui segment'>
      <form className='ui conatiner grid'>
        <div className='five wide column'>
          <div className='ui fluid dropdown'
            onFocus={() => setListVisible('origin')}
          >
            <div className='ui fluid input'>
              <label className='ui label hidden'>From</label>
              <input
                type="text"
                name="originCode"
                id="from"
                placeholder='From'
                required
                value={originCode}
                onChange={(e) => { setOriginCode(e.target.value) }}
              />
            </div>
            {(ListVisible === 'origin') ?
              <div className="ui menu transition visible" id="fromList">
                <div className="scrolling menu" >
                  {originList.length > 0 ? originList.map((item, index) => {
                    if (item.subType === 'AIRPORT') return (
                      <div className="item" key={index}
                        onClick={() => {
                          setOriginCode(`${item.iataCode} - ${item.name}`);
                          setListVisible('');
                          console.log(item)
                        }}>
                        <div className='middle aligned content'>
                          <div className='header'>
                            <i className='plane icon'></i>
                            {item.name}
                          </div>
                          <div className='meta'>
                            <span className='cinema'>{item.cityName}</span>
                            <i className={`${item.address.countryCode} flag`}></i>
                            {item.iataCode}
                          </div>
                        </div>
                      </div>
                    )
                  }) : null}
                  {originList.length > 0 ?
                    originList.map((item, index) => {
                      if (item.subType !== 'AIRPORT') return (
                        <div
                          className="item"
                          key={index}
                          onClick={() => {
                            setOriginCode(`${item.iataCode} - ${item.name}`);
                            setListVisible('');
                            console.log(item)
                          }}>

                          <div className='middle aligned content'>
                            <div className='header'>
                              <i className='map marker alternate icon'></i>
                              {item.name}
                            </div>
                            <div className='description'>
                              <i className={`${item.address.countryCode} flag`}></i>
                              {item.iataCode}
                            </div>
                          </div>
                        </div>
                      )
                    }) : null}

                </div>
              </div> : null}
          </div>
        </div>

        <div className='five wide column'>
          <div className='ui fluid dropdown'
            onFocus={() => { setListVisible('destination') }}
          >
            <div className='ui fluid input'>
              <label className='ui label hidden'>To</label>
              <input
                type="text"
                required
                placeholder='To'
                name="destinationCode"
                id="to"
                value={destinationCode}
                onChange={(e) => { setDestinationCode(e.target.value) }}
              />
            </div>
            {
              (ListVisible === 'destination') ? <div
                className="ui menu transition visible"
                id="toList">
                <div className="scrolling menu">
                  {(destinationList.length > 0) ? destinationList.map((item, index) => {
                    if (item.subType === 'AIRPORT') return (
                      <div className="item" key={index}
                        onClick={() => {
                          setDestinationCode(`${item.iataCode} - ${item.name}`);
                          setListVisible('');
                          console.log(item)
                        }}>
                        <div className='middle aligned content'>
                          <div className='header'>
                            <i className='plane icon'></i>
                            {item.name}
                          </div>
                          <div className='meta'>
                            <span className='cinema'>{item.cityName}</span>
                            <i className={`${item.address.countryCode} flag`}></i>
                            {item.iataCode}
                          </div>
                        </div>
                      </div>
                    )
                  }) : null
                  }
                  {(destinationList.length > 0) ? destinationList.map((item, index) => {
                    if (item.subType !== 'AIRPORT') return (
                      <div className="item" key={index}
                        onClick={() => {
                          setDestinationCode(`${item.iataCode} - ${item.name}`);
                          setListVisible('');
                          console.log(item)
                        }}>
                        <div className='middle aligned content'>
                          <div className='header'>
                            <i className='map marker alternate icon'></i>
                            {item.name}
                          </div>
                          <div className='meta'>
                            <span className='cinema'>{item.cityName}</span>
                            <i className={`${item.address.countryCode} flag`}></i>
                            {item.iataCode}
                          </div>
                        </div>
                      </div>
                    )
                  }) : null
                  }
                </div>
              </div> : null
            }

          </div>
        </div>

        <div className='four wide column'>
          <div className='ui fluid input'>
            <input
              type="date"
              name="dateOfDeparture"
              id="departureDate"
              required
              placeholder='Departure Date'
              value={dateOfDeparture}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className='one wide column'>
          <button
            className='ui icon button teal'
            type="submit" onClick={handleSearch}>
            <i className='search icon'></i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm