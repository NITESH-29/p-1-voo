// import { Injectable } from '@angular/core';
// import swal from 'sweetalert2';

// @Injectable()
// export class NotificationService {

//     constructor() {
//     }

//     private notification(title, text, type) {
//         swal(title, text, type);
//     }

//     private toast(title, type) {
//         swal({
//             position: 'top-end',
//             type: type,
//             title: title,
//             showConfirmButton: false,
//             toast: true,
//             timer: 2500
//         });
//     }

//     infoNotification(text) {
//         this.notification('Information', text, 'info');
//     }

//     errorNotification(text) {
//         this.notification('Error', text, 'error');
//     }

//     warningNotification(text) {
//         this.notification('Warning', text, 'warning');
//     }

//     questionNotification(text) {
//         this.notification('Question', text, 'question');
//     }

//     successNotification(text) {
//         this.notification('Success', text, 'success');
//     }

//     infoToast(title) {
//         this.toast(title, 'info');
//     }

//     errorToast(title) {
//         this.toast(title, 'error');
//     }

//     warningToast(title) {
//         this.toast(title, 'warning');
//     }

//     questionToast(title) {
//         this.toast(title, 'question');
//     }

//     successToast(title) {
//         this.toast(title, 'success');
//     }
// }