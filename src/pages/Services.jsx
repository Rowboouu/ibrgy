import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getDocuments, onSnapshot } from '../api/services'
import { Error, Upcoming } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import Documents from '../screens/user/Documents';

const Services = ({ profile, height, setScreen }) => {

  const [dropdown, setDropdown] = useState(null)
  const [fetchState, setFetchState] = useState(0);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleDropdown = (index) => {
    if (dropdown === index) return setDropdown(null)
    setDropdown(index)
  }

  const handleRequest = (index) => {
    if (!profile) return navigate('/login');

    setScreen(index + 8)
  }

  useEffect(() => {
    const query = getDocuments();

    try {
      const unsub = onSnapshot(query, snapshot => {
        if (!snapshot) {
          setFetchState(-1)
          return
        }

        if (snapshot.empty) {
          setFetchState(2)
          return
        }

        const docs = snapshot.docs.map((doc) => doc.data());
        setDocuments(docs)
        setFetchState(1)
      })

      return () => {
        unsub()
      }

    } catch (err) {
      console.log(err)
      setFetchState(-1)
    }
  }, []);

  const StateBuilder = (state) => {

    const states = {
      "2": {
        icon: <Upcoming />,
        text: 'No entries'
      },
      "-1": {
        icon: <Error />,
        text: 'Something went wrong.'
      },
      "0": {
        icon: <CircularProgress />,
        text: 'Loading documents...'
      }
    }

    return (
      <div className='flex flex-col h-full justify-center items-center gap-4 text-[#FEC51C]'>
        {states[`${state}`].icon}
        <p className='text-sm text-[#1F2F3D]'>{states[`${state}`].text}</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <h1 className='text-3xl font-bold font-arimo mt-2 mb-4'>Documents Offered</h1>
      <div className={`h-[${height}px] w-full overflow-auto`}>
        <div className='flex flex-col items-center gap-6'>
          {
            fetchState != 1 ? StateBuilder(fetchState) :
              documents.map((item, i) => {
                return (
                  <Documents onClick={() => {
                    handleRequest(i);
                  }} docs={item} />
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

export default Services