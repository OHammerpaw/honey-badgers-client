import React, { useState } from 'react'

import { randomActivity } from '../../api/activity'
import ActivityForm from '../shared/ActivityForm'

const RandomActivity = ({ user, msgAlert, triggerRefresh }) => {
    const defaultActivity = {
        activity: '',
        type: '',
        accessibility: '',
        participants: '',
        price: '',
        progress: 0,
        private: false
    }


    const [activity, setActivity] = useState(defaultActivity)

    const handleChange = (e , target) => {
        
        setActivity(prevActivity => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedActivity = { [updatedName]: updatedValue }

            return { ...prevActivity, ...updatedActivity}
        })
    }
    const handleRandomActivity = (e) => {
        e.preventDefault()

        randomActivity(user, activity)
        .then(() => {
           
            msgAlert({
                heading: 'Success',
                message: 'Created Activity',
                variant: 'success'
            })
        })
        .then(() => triggerRefresh())
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Activity Failure' + error,
                variant: 'danger'
            })
        })
    } 

    return (
        <ActivityForm
            activity={ activity }
            handleChange= { handleChange }
            handleSubmit= {handleRandomActivity}
        />
    )
}

export default RandomActivity
