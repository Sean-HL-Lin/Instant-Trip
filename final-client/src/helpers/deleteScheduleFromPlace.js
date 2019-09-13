import axios from 'axios';

export default function deleteScheduleFromPlace (placeId, setUser) {
  axios.delete(`/places/${placeId}/schedule`).then((response) => {
    setUser(prev => ({...prev}))
  })
}
