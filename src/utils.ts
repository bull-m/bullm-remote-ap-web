/**
 * DOM工具函数
 * 用于在#app元素中添加和移除DOM节点
 */

/**
 * 向#app元素添加新的DOM节点
 * @param html - 要插入的HTML内容
 * @param id - 新元素的ID，会自动移除#前缀
 * @param className - 可选，指定元素的class名
 */
export function DomAddToApp(html: string, id: string, className?: string) {
    // 移除id中的#符号
    if (id.startsWith('#')) {
        id = id.substring(1)
    }
    
    // 先移除旧节点，避免重复
    DomRemoveToApp(id)
    
    // 创建新节点
    const div = document.createElement('div')
    div.id = id
    if (className) {
        div.className = className
    }
    div.innerHTML = html
    
    // 添加到#app元素
    document.querySelector<HTMLDivElement>('#app')!.appendChild(div)
}

/**
 * 从#app元素中移除指定DOM节点
 * @param id - 要移除的元素ID，会自动添加#前缀
 */
export function DomRemoveToApp(id: string) {
    // 确俚id带有#符号
    if (!id.startsWith('#')) {
        id = '#' + id
    }
    document.querySelector<HTMLDivElement>(id)?.remove()
}
