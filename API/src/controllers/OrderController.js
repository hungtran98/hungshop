const Order = require('../models/Order')

class OrderController {

    //[POST]
    createOrder = async (req, res) => {
        const newOrder = new Order(
            req.body
        )
        try {
            await newOrder.save()
            res.status(200).json(newOrder)
        } catch (error) {
            res.status(500).json(error)          
        }
    }


    //[PUT]   /Order/:id
    updateOrder = async ( req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true} 
        )
        res.status(200).json(updateOrder)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

    //[DELETE] /Order/:id
    deleteOrder = async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json('deleted!')
        } catch (error) {
            res.status(500).json(error) 
        }
    }

   //[GET]  /Order/find/:userId   --get userOrder
    getUserOrder = async (req, res) => {
        try {
            const userOrder = await Order.findOne(req.params.userId)
            res.status(200).json(userOrder)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //[GET]  /Order/find/  --get all Orders
    getOrders = async (req, res) => {
        try {
               const allOrders = await Order.find({})
                res.status(200).json(allOrders)
            }
        catch (error) {
            res.status(500).json(error)
        }
    }

    //get monthly income
    //[GET]  /order/income
    getIncome = async (req, res) => {
        const date = new Date()
        const lastMonth = new Date(date.setMonth( date.getMonth() - 1 ))
        const previousMonth = new Date(new Date().setMonth( lastMonth.getMonth() - 1 ))

        try {
            const income = await Order.aggregate([
                {$match: { createdAt: {$gte: previousMonth} } },
                {
                    $project:{ month: { $month: "$createdAt"}, sales: "$amount" }
                },
                {
                    $group: { 
                        _id: "$month",
                        total: {$sum: "$sales"}
                    }
                }
            ])
            res.status(200).json(income)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new OrderController