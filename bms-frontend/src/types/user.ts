// {
// 	"admins": [
// 		{
// 			"user": {
// 				"id": "20d45f6d-6e73-4058-bc68-d0f9f2c75e13",
// 				"firstName": "John",
// 				"lastName": "Doe",
// 				"email": "john.doe@example.com",
// 				"profilePhoto": null,
// 				"createdAt": "2024-07-14T08:29:30.946Z",
// 				"updatedAt": "2024-07-14T08:29:30.946Z"
// 			}
// 		}
// 	]
// }

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

interface Member {
  user: User;
}

interface Admin {
  user: User;
}
