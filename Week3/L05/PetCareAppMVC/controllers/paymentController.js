const mockServices = require('../data/mockServices');

function preparePayment(req, res) {
  const serviceIdParam = req.params.serviceId;
  const serviceId = /^\d+$/.test(serviceIdParam) ? Number(serviceIdParam) : NaN;
  const service = Number.isSafeInteger(serviceId)
    ? mockServices.find(item => item.id === serviceId)
    : undefined;

  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  return res.status(200).json({
    serviceId: service.id,
    serviceName: service.name,
    amount: service.price,
    currency: 'sgd',
    status: 'READY_FOR_PAYMENT'
  });
}

module.exports = { preparePayment };
