import React from "react";

export default function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html>
			<body>
				<div style={{ padding: 16 }}>
					<header style={{ marginBottom: 12 }}>
						<h2>Admin</h2>
					</header>
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
