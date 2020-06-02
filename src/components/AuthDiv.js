import React from 'react';
import { hasPermission } from "../libs";

// 判断是否有菜单权限
export default function AuthDiv(props) {
    let disabled = props.disabled === undefined ? false : props.disabled;
    console.log(disabled, props.auth)
    if (props.auth && !hasPermission(props.auth)) {
        disabled = true;
    }
    return disabled ? null : <div {...props}>{props.children}</div>
}
