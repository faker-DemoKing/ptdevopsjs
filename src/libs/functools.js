let Permission = {
    isSuper: false,
    permissions: []
};

export function updatePermissions(isSupper, data) {
    Permission.isSuper = isSupper;
    Permission.permissions = data;
}

// 前端页面的权限判断(仅作为前端功能展示的控制，具体权限控制应在后端实现)
export function hasPermission(strCode) {
    const { isSuper, permissions } = Permission;
    // console.log(isSuper, strCode, permissions);
    if (!strCode || isSuper) return true;
    for (let or_item of strCode.split('|')) {
        if (isSubArray(permissions, or_item.split('&'))) {
            return true
        }
    }
    return false
}

//  数组包含关系判断
export function isSubArray(parent, child) {
    for (let item of child) {
        if (!parent.includes(item.trim())) {
            return false
        }
    }
    return true
}