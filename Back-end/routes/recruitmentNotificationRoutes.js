const express = require('express');
const router = express.Router();
const recruitmentNotificationController = require('../controllers/recruitmentNotificationController');
const { protect, authorize, authorizeAdminHR } = require('../middlewares/authMiddleware');

// Tạo thông báo mới
router.post('/', protect, authorizeAdminHR('create'), recruitmentNotificationController.createNotification);

// Lấy danh sách thông báo
router.get('/', protect, recruitmentNotificationController.getNotifications);

// Đánh dấu thông báo đã đọc
router.put('/:recruitmentId/read', protect, recruitmentNotificationController.markAsRead);

// Xóa thông báo theo recruitmentId - cho phép cả CEO và các vai trò khác
router.delete('/by-recruitment/:recruitmentId', protect, recruitmentNotificationController.deleteNotificationByRecruitmentId);

// Tạo thông báo khi CEO phê duyệt
router.post('/approval/:recruitmentId', protect, authorize('ceo'), recruitmentNotificationController.createApprovalNotification);

module.exports = router; 