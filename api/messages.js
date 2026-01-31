let messages = []

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    
    const game = req.query.game || '1'
    
    if (req.method === 'POST') {
        const { user, userId, msg } = req.body
        const time = Date.now()
        
        messages.push({ user, userId, msg, time, game })
        
        if (messages.length > 100) {
            messages = messages.slice(-100)
        }
        
        return res.json({ success: true })
    }
    
    if (req.method === 'GET') {
        const after = parseInt(req.query.after) || 0
        const filtered = messages.filter(m => m.game === game && m.time > after)
        
        return res.json({ messages: filtered })
    }
    
    res.status(405).json({ error: 'Method not allowed' })
}
