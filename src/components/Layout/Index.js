import React, { useState } from 'react'
import SearchForm from './SearchForm'
import List from './List'


const Layout = () => {
    const [searchQuery, setSearchQuery] = useState({})
    const [dataList, setDataList] = useState(undefined)
    const getList = () => {
        console.log(searchQuery)
        setDataList(undefined)
        //a post fetch request with searchQuery as body
        fetch(`http://localhost:4000/api/flight-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchQuery)
        })
            .then(res => res.json())
            .then(data => setDataList(data))
            .catch(err => console.log(err))
        //
    }
    return (
        <div className="ui masthead vertical segment">
            <div className='ui container'>
                <SearchForm setData={setSearchQuery} searchTrigger={getList} />
                {dataList && <List Items={dataList} />}
            </div>
        </div>
    )
}

export default Layout