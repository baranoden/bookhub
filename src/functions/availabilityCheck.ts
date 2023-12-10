export const availabilityCheck = (item) => {
  if (item.saleInfo?.saleability === 'NOT_FOR_SALE') {
    return false
  } else if (item.saleInfo?.saleability === 'FREE') {
    return false
  }
  return true
}
