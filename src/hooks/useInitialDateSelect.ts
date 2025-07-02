   
  export const useInitialDateSelect =()=>{
    const dateToAdjust = new Date()
    const dayOfWeek = dateToAdjust.getDay()
    if (dayOfWeek === 0) {
        dateToAdjust.setDate(dateToAdjust.getDate() + 2)
    }
    if (dayOfWeek === 1) {
        dateToAdjust.setDate(dateToAdjust.getDate() + 1)
    }
    const adjustedDate = dateToAdjust.toDateString()
    return {adjustedDate}
  }