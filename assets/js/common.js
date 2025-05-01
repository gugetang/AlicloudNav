"use strict";

function getSafeIcon(icon) {
    // 检查icon是否存在且包含svg标签
    if (!icon || typeof icon !== 'string' || !icon.includes('<svg')) {
        return `<svg t="1746080019931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9948" width="24" height="24"><path d="M904 120H120c-30.9 0-56 25.1-56 56v560c0 30.9 25.1 56 56 56h280v56h-84c-15.5 0-28 12.5-28 28s12.5 28 28 28h392c15.5 0 28-12.5 28-28s-12.5-28-28-28h-84v-56h280c30.9 0 56-25.1 56-56V176c0-30.9-25.1-56-56-56zM568 848H456v-56h112v56z m336-112H120v-56h784v56zM120 624V176h784v448H120z" p-id="9949"></path></svg>`;
    }
    return icon.trim();
}

function eventHandler() {
    fetch('config.yaml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error, code:${response.status}`);
            }
            return response.text();
        })
        .then(yamlText => {
            const navList = document.getElementById('navList');
            navList.innerHTML = '';

            const config = jsyaml.load(yamlText);
            if (config?.items?.selfed) {
                config.items.selfed.forEach(item => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
    
                    a.href = item.url;
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.innerHTML = `${getSafeIcon(item.icon)}${item.title}`;
    
                    li.appendChild(a);
                    navList.appendChild(li);
                });
            }           
        })
        .catch(error => {
            console.error('error:', error);
        });
}

if (document.readyState !== 'loading') {
    eventHandler();
} else {
    document.addEventListener('DOMContentLoaded', eventHandler, { once: true });
}