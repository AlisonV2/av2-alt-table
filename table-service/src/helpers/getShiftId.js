function getShiftId(shift) {
    return `${shift.date}-${shift.type}`
}

export default getShiftId;