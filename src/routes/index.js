import express from "express";
const router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    PingResponse:
 *     type: object
 *     title: PingResponse
 *     properties:
 *        greeting:
 *           type: string
 *        date:
 *           type: string
 *        url:
 *           type: string
 *        headers:
 *           type: object
 *           properties:
 *              Content-Type:
 *                  type: string
 *           additionalProperties: true
 */

/**
 * @openapi
 * /ping:
 *   get:
 *     tags:
 *       - Ping
 *     responses:
 *       200:
 *         description: Ping Response
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/PingResponse'
 */
router.get("/ping", function (req, res, next) {
  res.json({
    greeting: "Hello from ExpressJS",
    date: new Date(),
    url: "/ping",
    headers: res.getHeaders(),
  });
});

router.use("/apicronlog", require("./apicronlogs"));

router.use("/carousels", require("./carousel"));

router.use("/categories", require("./category"));

router.use("/clickhistories", require("./clickhistory"));

router.use("/contactus", require("./contactus"));

router.use("/faqs", require("./faqs"));

router.use("/feeds", require("./feed"));

router.use("/followcategory", require("./followcategory"));

router.use("/followfeed", require("./followfeed"));

router.use("/followstore", require("./followstore"));

router.use("/missingcashbackclaims", require("./missingcashbackclaims"));

router.use("/networks", require("./networks"));

router.use("/notifications", require("./notifications"));

router.use("/pages", require("./pages"));

router.use("/partnerWithUs", require("./partnerwithus"));

router.use("/payoutsetting", require("./payoutsetting"));

router.use("/profitsummary", require("./profitsummary"));

router.use("/userlogrequests", require("./userlogrequests"));

router.use("/usertracking", require("./usertracking"));

router.use("/usertransactions", require("./usertransactions"));

router.use("/userwallet", require("./userwallet"));

router.use("/withdrawals", require("./withdrawals"));

router.use("/olpostback", require("./olpostback"));

router.use("/users", require("./users"));

router.use("/roles", require("./roles"));

router.use("/permissions", require("./permissions"));

router.use("/resources", require("./resources"));

router.use("/accesses", require("./accessmatrix"));

router.use("/stores", require("./stores"));

router.use("/containers", require("./containers"));

module.exports = router;
