import { jwtDecode } from 'jwt-decode';

interface DecodedAuthToken {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    exp: number;
    iss: string;
    aud: string;
}
export interface UserInfo {
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
}

export function GetAuthHeader(): object {
    const authCookie = getCookie("auth");
    if (!authCookie) {
        throw new Error('No authorized user.');
    }
    return {
        'Authorization': `Bearer ${authCookie}`
    };
}
export function SetAuthCookie(token: string) {
    setCookie("auth", token, 31);
}

export function GetCurrentUser(): UserInfo | null {
    const authCookie = getCookie("auth");
    if (!authCookie) {
        return null;
    }
    const decodedToken = jwtDecode(authCookie) as DecodedAuthToken;
    const userInfo = {
        userId: parseInt(decodedToken.userId),
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        fullName: decodedToken.firstName + " " + decodedToken.lastName,
        email: decodedToken.email
    }
    return userInfo;
}

function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name: string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";").map(cookie => cookie.trim());

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}

