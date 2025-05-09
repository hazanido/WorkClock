

const calculateWorkHours = (checkIN,checkOut)=> {

    const [inHours, inMinutes] = checkIN.split(':').map(Number);
    const [outHours, outMinutes] = checkOut.split(':').map(Number);

    const totalInHours = (inHours*60+inMinutes)/60;
    const totalOutHours = (outHours*60+outMinutes)/60;

    return parseFloat((totalOutHours - totalInHours).toFixed(2));

}

module.exports = { calculateWorkHours }

