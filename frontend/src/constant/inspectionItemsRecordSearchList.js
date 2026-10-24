const SEARCH_LIST = [
  { name: 'prenatalExaminationPlanName', type: 'input' },
  { name: 'productLine', type: 'input' },
  { name: 'inspectorName', type: 'input', queryName: 'inspector' },
  { name: 'inspectionResult', type: 'filter' },
  { name: 'inspectionTime', type: 'timeline', queryTip: ['startInspectionTime', 'endInspectionTime'] },
  { name: 'reviewTime', type: 'timeline', queryTip: ['startReviewTime', 'endReviewTime'] },
  { name: 'reviewByName', type: 'input', queryName: 'reviewBy' },
  { name: 'reviewResult', type: 'filter' }
]

export { SEARCH_LIST }
