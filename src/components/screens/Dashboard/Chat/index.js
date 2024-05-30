'use client';

// Note: Chats component...!

// Note: importing required materials...!
import React, { useState, useEffect, useRef } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBIcon,
	MDBTypography,
	MDBInputGroup,
	MDBBtn,
} from 'mdb-react-ui-kit';
import {
	profile,
} from '@/assests';
import styles from '@/styles/Chat.module.css';
// import instance from "@/axios-config/axios"
import axios from 'axios';
import { getUserFromLocalStorage } from '@/utils/auth';
import { getJsonWithToken } from '@/api/api.instances';
import socketIO from "socket.io-client"
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
// import WebSocket from "websocket";
const SOCKET_SERVER_URL = "http://localhost:4000";
import Button from '@/components/ui/LandingPage/Button';
import { useTranslations } from 'next-intl';
import { MdOutlinePresentToAll } from "react-icons/md";
import { Links, PATHS } from '@/contants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/assests/icons/newlogo.svg';
import { logo } from '@/assests';
import Input from '@/components/ui/Input';
import { searching } from '@/assests';
import { toast } from 'react-toastify';

const Chats = () => {
	const user = getUserFromLocalStorage();

	// Note: Handeling refrences (Because we can not use DOM in React JS / Next JS)...!
	const divRef = useRef(null);
	const inputRef = useRef(null);

	// States...!
	const [searchUser, setSearchUser] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [message, setMessage] = useState('');
	const [socketState, setSocketState] = useState(false);
	const [mergeUid, setMergeUid] = useState(undefined);
	const [messageCollectionId, setMessageCollectionId] = useState("");
	const [messages, setMessages] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [messageByRole, setMessageByRole] = useState();
	const t = useTranslations('Signin.form');

	// Current Path
	const pathname = usePathname();
	const currentPath = pathname?.slice(1, 3);
	const [isVisible, setVisible] = useState(false);





	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (socketState === undefined || socketState === false) {
			// const socketState = socketIO.connect("https://sponserendpoint.netlify.app/.netlify/functions/server/", { transports: ['websocket'], path: "/socket.io" })
			// const socketState = io("https://sponserendpoint.netlify.app", { transports: ['websocket'], path: "/socket.io" })
			// const socketState = new WebSocket('wss://netlifyhost/socket.io')

			const socketState = io('https://sponserendpoint.netlify.app/.netlify/functions/server', {
				transports: ['websocket'],
				secure: true, // Ensure the connection is secure
				reconnection: true, // Enable reconnection
				reconnectionAttempts: 5, // Number of reconnection attempts
				reconnectionDelay: 2000, // Time to wait before reconnection attempts
				timeout: 5000, // Connection timeout duration
			});

			// const socket = socketIOClient("https://sponserendpoint.netlify.app/", {
			// 	transports: ['websocket'],
			// 	path: "/socket.io"
			// });
			if (socketState) {
				setSocketState(socketState)
				// console.log("Socket connected successfully: ", socketState)
			}
			// console.log("not", socketState)
		}

		if (socketState && socketState.connected) {
			// console.log("Socket connected successfully: ", socketState)

			// Note: Receiving message from server...!
			socketState.on("message-received", (message) => {
				// console.log("New message received from server: ", message)
				fetchMessages(messageCollectionId)
			})
		}
		// fetchMessages(messageCollectionId)

		const intervalId = setInterval(() => {
			fetchMessages(messageCollectionId);
		}, 5000);

		return () => {
			clearInterval(intervalId);
		};

	}, [socketState, messageCollectionId])

	// Note: Mounted hook...!

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {

		// Note: Esc button handler...!
		const user = getUserFromLocalStorage();
		if (user?.role === "user") {
			getUsers(user?.id, user?.key);
		}
		else {
			getSponsorFamily(user?.id, user?.key)
		}
		// if (user?.role === "family") {
		// 	getSponsorFamily(user?.id, user?.key)
		// }

		const handleEsc = (event) => {
			if (event.key == 'Escape') {
				console.log('Escape pressed!');
				setSelectedUser(null);
			}
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [user]);



	const getUsers = async (sponsorId, token) => {
		try {
			// setIsLoading(false)
			const response = await getJsonWithToken(
				`https://sponserendpoint.netlify.app/.netlify/functions/server/donated/${sponsorId}/families`,
				token && token,
			);
			setUsersList(response?.families);
			// setIsLoading(true)
		} catch (error) {
			// setIsLoading(false)
			console.error('Error fetching users:', error);
			throw error;
		}
		// setIsLoading(false)
	};


	const getSponsorFamily = async (familyId, token) => {
		try {
			// setIsLoading(false)
			const response = await getJsonWithToken(
				`https://sponserendpoint.netlify.app/.netlify/functions/server/donated/${familyId}/sponsors`,
				token && token,
			);
			// console.log("Gamil", response)
			setUsersList(response?.donations);
			// setIsLoading(true)
		} catch (error) {
			// setIsLoading(false)
			console.error('Error fetching users:', error);
			throw error;
		}
		// setIsLoading(false)
	};


	const selectUser = (data) => {
		const user = getUserFromLocalStorage();
		// console.log('Selected User: ', data);
		var messageId;

		if (data) {
			setSelectedUser(data);

			// Note: Merging user id's...!
			if (user?.role === "user") {
				messageId = user?.id + data?.family?._id
				setMessageCollectionId(messageId)
			} else {
				messageId = data?.sponsor + user?.id
				setMessageCollectionId(messageId)
			}

			// messageId = user?.id + data?._id
			// setMessageCollectionId(messageId)
			// console.log("id", messageCollectionId)
			if (socketState) {
				socketState.emit('join_room', messageCollectionId);
				fetchMessages(messageCollectionId);
			}

		}
	};






	// Note: Api call handler to fetch all messages...!
	const fetchMessages = async (id) => {
		// console.log('Message collection id in fetchMessage: ', id);

		try {

			let response = await axios.get(
				`https://sponserendpoint.netlify.app/.netlify/functions/server/fetch/${id}`,
			);
			// console.log(response);

			let { status, data } = response;
			if (status == 200) {
				let targetData = data?.data;
				// console.log('Messages: ', targetData)

				let sortMessages = [...targetData];
				sortMessages.sort((a, b) => {
					let itemA = new Date(a.timeStamp);
					let itemB = new Date(b.timeStamp);

					return itemA - itemB;
				});

				// console.log('Sorted Messages: ', sortMessages);
				if (sortMessages) {
					setMessages(sortMessages);
					moveToScrollDown();
				}
			}
		} catch (error) {
			// console.log('Something went wrong while fetching chats: ', error);
		}
	};

	// Note: Handler to scroll down to latest messages...!
	const moveToScrollDown = () => {
		let div = divRef.current;
		div.scrollTop = div.scrollHeight;
	};

	// Function to handle key press event
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage();
		}
	};

	const getTokenConfig = (token) => {
		const tokenInJsonFormat = JSON.parse(token);
		const config = {
			headers: {
				Authorization: tokenInJsonFormat ? `Bearer ${tokenInJsonFormat}` : '',
			},
		};
		return config;
	};

	const sendMessage = async () => {
		try {
			const user = getUserFromLocalStorage();
			let inputEl = inputRef.current;
			// console.log(message)
			setMessage('');
			inputEl.focus();

			
			if (messages.length === 0 && user?.role === "family") {
				toast.error(t("firstContact"));
				return; // Prevent sending a message
			  }

			let messageData;

			if (user?.role === "family") {
				messageData = {
					message: message,
					timeStamp: new Date().getTime(),
					// senderId: user?.id,
					senderId: user?.id,
					receiverId: selectedUser?.sponsor,
					// receiverId: user?.id,
					messageCollectionId: messageCollectionId,
				};
				// setMessageByRole(messageData)
			}
			else {
				messageData = {
					message: message,
					timeStamp: new Date().getTime(),
					// senderId: user?.id,
					senderId: user?.id,
					receiverId: selectedUser?.family?._id,
					// receiverId: user?.id,
					messageCollectionId: messageCollectionId,
				};
				// setMessageByRole(messageData)
			}

			const token = localStorage.getItem('AuthToken');
			const config = getTokenConfig(token);
			const response = await axios.post(
				`https://sponserendpoint.netlify.app/.netlify/functions/server/create-chat`,
				messageData,
				// messageByRole,
				config,
			);
			fetchMessages(messageCollectionId);
			socketState.emit('new_message', messageData);
			fetchMessages(messageCollectionId);
			// Check if socketState is available
			// if (socketState) {
			// const token = localStorage.getItem('AuthToken');
			// const config = getTokenConfig(token);
			// const response = await axios.post(
			// 	`https://sponserendpoint.netlify.app/.netlify/functions/server/create-chat`,
			// 	messageData,
			// 	// messageByRole,
			// 	config,
			// );
			// // console.log(response); // Note the use of "await" to wait for the response
			// fetchMessages(messageCollectionId);
			// socketState.emit('new_message', messageData);
			// fetchMessages(messageCollectionId);
			// } else {
			// 	console.log('Socket is not initialized or null');
			// }

		} catch (error) {
			console.log('Error posting data:', error);
		}
	};

	// Note: Function to leave the chat room...!
	const leaveChatRoom = () => {
		setSelectedUser(null);
		// console.log(`Merge Uid: ${messageCollectionId}`);

		// Note: Leaving the chat room...!
		// socketState.emit("leave_chat", messageCollectionId);
		socketState.emit('leave_chat', messageCollectionId);
	};


	if (!pathname) {
		return null;
	}

	let currentPathName = pathname
		.replace('/en', '')
		.replace('/ar', '')
		.replace('/tr', '');

	if (currentPathName === '') {
		currentPathName = '/';
	}
	return (
		<div className="py-5 divide" >
			<div>
				<div className="p-3">
					{/* Note: Search user section */}
					<div className="rounded mb-3">
						{user?.role === "user" ? (
							<p className="text-center font-bold color-[#8dae8e]"> {t("yourSponsorFamily")} </p>
						) : (
							<p className="text-center font-bold color-[#8dae8e]">{t("yourDonator")}</p>
						)}
						{/* <input
							className={`${styles.formControl} rounded`}
							placeholder="Search"
							type="search"
							style={{
								width: '100%',
								padding: '5px',
							}}
							value={searchUser}
							// onChange={handleSearchChange}
							onChange={(e) => setSearchUser(e.target.value)}
						/>
						<span
							className="input-group-text border-0"
							id="search-addon"
						>
							<MDBIcon fas icon="search" />
						</span> */}
					</div>
					{/* Note: Users list section */}
					<div
						style={{
							position: 'relative',
							height: '65vh',
							overflow: 'scroll',
						}}
						ref={divRef}
					>

						<MDBTypography listUnStyled className="mb-0">
							{usersList && usersList.length > 0
								? usersList.map((item, index) => {
									return item?._id == item?.family?.id ? null : (
										<li
											key={item?._id}
											className="p-2 border-b border-black"
											onClick={() => selectUser(item)}
											style={{ cursor: 'pointer' }}
										>
											<a className="d-flex justify-content-between">
												<div className="d-flex flex-row">
													<div className="pt-1">
														{/* Note: User name */}
														<p className="fw-bold mb-0 onHover"
															style={{ color: '#cf7475', fontWeight: "bold" }}>
															{item?.family?.email}
															{user?.role === "family" && (
																<p className="fw-bold mb-0"
																	style={{ color: '#cf7475', fontWeight: "bold" }}>
																	{item?.name}
																</p>
															)}
														</p>
														{/* Note: User's last message */}
														<p className="small text-muted">
															{t("hello")}
														</p>
														{/* Note: User's last message time */}
														{/* <p className="small text-muted mb-1"
															style={{ color: '#8dae8e', fontWeight: 'bold', fontStyle: 'italic' }}>
															{new Date().toLocaleTimeString()}
														</p> */}
													</div>
												</div>
											</a>
										</li>
									);
								})
								: (t("noSponsor"))}
						</MDBTypography>

					</div>
				</div>

			</div>


			<div className={`${styles.chatContainer} p-3`}>
				<div className={`text-muted divide pt-3 mt-2 ${styles.selectedUser}`}>
					<div className="flex items-center">
						<Image
							src={currentPath === 'en' || currentPath === 'tr' ? logo : Logo}
							alt="Logo"
							width={30}
							height={30}
							className={`relative top-0 transition-all duration-200 ease-in-out`}
						/>
						<span className={`text-[#36454F] ${styles.username}`}>
							{user?.role === "user"
								? selectedUser != null
									? selectedUser?.family?.email
									: t("contact")
								: user?.role === "family"
									? selectedUser?.name
									: "Chat Messages"
							}
						</span>

					</div>
					<Button
						onClick={leaveChatRoom}
						title={t("leaveChat")}
						Color="#8DAE8E"
					>
					</Button>
				</div>

				<div
					style={{
						position: 'relative',
						height: '58vh',
						overflow: 'scroll',
						marginTop: '10px',
					}}
					className={`${styles.chatBox} pt-3 pe-3`}
					ref={divRef}
				>
					{/* {
						(messages && messages.length > 0) ?
							(
								messages.map((item, index) => {
									return (
										<div
											key={item?._id}
											className={item?.senderId !== user?.id ? `${styles.chat}` : `${styles.chatReceiver}`}
											style={{ width: '100%' }}
										>
											<div>
												<p
													className={item?.senderId != user?.id ? "small p-2 ms-3 mb-1 rounded-3" : "small p-2 me-3 mb-1 text-white rounded-3 bg-primary"}
													style={{ backgroundColor: item?.senderId != user?.id ? "#f5f6f7" : null }}
												>
													{item?.message}
												</p>
												<p className={`${styles.chatTime} ${item?.senderId !== user?.id ? "float-end" : ""}`}>
													{new Date(item?.timeStamp).toLocaleTimeString()}
												</p>
											</div>
										</div>
									)
								})
							)
							: (t("startChat"))
					} */}

					{(messages && messages.length > 0) ? (
						messages.map((item, index) => (
							
							<div
								key={item?._id}
								className={item?.senderId !== user?.id ? `${styles.chat}` : `${styles.chatReceiver}`}
								style={{ width: '100%' }}
							>
								<div>
									<p
										className={item?.senderId !== user?.id ? "small p-2 ms-3 mb-1 rounded-3" : "small p-2 me-3 mb-1 text-white rounded-3 bg-primary"}
										style={{ backgroundColor: item?.senderId !== user?.id ? "#f5f6f7" : null }}
									>
										{item?.message}
									</p>
									<p className={`${styles.chatTime} ${item?.senderId !== user?.id ? "float-end" : ""}`}>
										{new Date(item?.timeStamp).toLocaleTimeString()}
									</p>
								</div>
							</div>
						))
					) : (
						user?.role === "family" && messages.length === 0 ? (<p>{t("initiateChat")}</p>) : t("startChat")
					)}
				</div>

				<div className={`${styles.footer}`}>

					<input
						type="text"
						className={`${styles.formControl} form-control-lg min-w-[700px] max-w-[1000px] p-2`}
						id="exampleFormControlInput2"
						placeholder={t("message")}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						ref={inputRef}
						onKeyDown={handleKeyDown}
					/>
					<MdOutlinePresentToAll
						className={`${styles.sending_icons}`}
						onClick={sendMessage}
					/>
				</div>
			</div>


		</div>






	);
};

export default Chats;
