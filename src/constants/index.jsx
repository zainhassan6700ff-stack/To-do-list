// import { createColumnHelper } from "@tanstack/react-table";
// import { ArrowUpDown, Mail, User } from "lucide-react";
// import { handleDeletePost } from "../components/DeletePost";
// import { Link } from "react-router-dom";

// const columnHelper = createColumnHelper();

// export const columns = [
//   columnHelper.accessor("id", {
//     header: () => (
//       <span className="flex items-center">
//         <User className="mr-2" size={16} /> ID
//         <ArrowUpDown size={14} className="ml-2" />
//       </span>
//     ),
//     cell: (info) => info.getValue(),
//   }),

//   columnHelper.accessor("name", {
//     header: () => (
//       <span className="flex items-center">
//         <User className="mr-2" size={16} /> Name
//         <ArrowUpDown size={14} className="ml-2" />
//       </span>
//     ),
//     cell: (info) => info.getValue(),
//   }),

//   columnHelper.accessor("email", {
//     header: () => (
//       <span className="flex items-center">
//         <Mail className="mr-2" size={16} /> Email
//         <ArrowUpDown size={14} className="ml-2" />
//       </span>
//     ),
//     cell: (info) => info.getValue(),
//   }),

//   columnHelper.accessor("body", {
//     header: () => (
//       <span className="flex items-center">
//         <User className="mr-2" size={16} /> Body
//         <ArrowUpDown size={14} className="ml-2" />
//       </span>
//     ),
//     cell: (info) => info.getValue(),
//   }),

//   columnHelper.display({
//     header: "Actions",
//     cell: (props) => {
//       let rowData = props.row.original;
//       return (
//         <div className="flex gap-2">
//           <button
//             className="action-button bg-[#415E72]"
//             onClick={() => handleDeletePost(rowData.id)}
//           >
//             Delete
//           </button>
//           <Link to="/updatePost">
//             <button
//               className="action-button bg-[#17313E]"
//               // onClick={}
//             >
//               Edit
//             </button>
//           </Link>
//         </div>
//       );
//     },
//   }),
// ];
