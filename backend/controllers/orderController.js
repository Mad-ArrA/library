import asyncHandler from 'express-async-handler';   //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Order from '../models/orderModel.js';


// @desc      Create New Order
// @route     POST  /api/orders
// @access    Private
const addOrderItems = asyncHandler(async(req, res) => {

    const {
        orderItems, shippingAddress, paymentMethod, itemsPrice, totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order Items');

    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice
        })

        const createdOrder = await order.save();
        res.status(201).json({
            createdOrder
        })
    }
})



// @desc      Get Order by ID
// @route     GET  /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})


// @desc      Update Order to Paid
// @route     GET  /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        // Recieved from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,

        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})



// @desc      Update Order to Delivered
// @route     GET  /api/orders/:id/deliver
// @access    Private/admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found')
    }
})



// @desc      Get Logged In User Orders
// @route     GET  /api/orders/myorders
// @access    Private
const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id });

    res.json(orders)
})


// @desc      Get All Orders
// @route     GET  /api/orders/
// @access    Private/admin
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
})




export { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }
