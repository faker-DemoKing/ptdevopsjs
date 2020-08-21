let Permission = {
    isSuper: false,
    permissions: []
};

export function updatePermissions(isSupper,hostPerms, data) {
    Permission.isSuper = isSupper;
    Permission.hostPerms = hostPerms;
    Permission.permissions = data;
}

// 前端页面的权限判断(仅作为前端功能展示的控制，具体权限控制应在后端实现)
export function hasPermission(strCode) {
    const { isSuper, permissions } = Permission;
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

// 生成唯一id
export function uniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    });
  }