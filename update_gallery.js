const fs = require('fs');
let content = fs.readFileSync('src/components/ui/circular-gallery.tsx', 'utf8');

// replace initial state to avoid hydration mismatch
content = content.replace(
    /getResponsiveDimensions\(typeof window !== "undefined" \? window.innerWidth : 1440\)/,
    'getResponsiveDimensions(1440)'
);

// update mobile multipliers
content = content.replace(
    /radiusMult = 0\.40;[\s\S]*?perspMult = 4\.0;/,
    `radiusMult = 0.30;   
        cardWMult = 0.25;    
        cardHMult = 0.35;    
        containerHMult = 0.60; 
        perspMult = 4.0;`
);

fs.writeFileSync('src/components/ui/circular-gallery.tsx', content);
