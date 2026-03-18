import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react"
import { View, Text, StyleSheet } from 'react-primitives'
import CircleAvatar from './circleAvatar'

const THRESHOLD = 80

const Card = forwardRef(({ profile, onSwipeOff, onDragDirection }, ref) => {
    const [pos, setPos]         = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const [flying, setFlying]   = useState(false)
    const [flyDir, setFlyDir]   = useState(null)

    const dragRef    = useRef(false)
    const startPos   = useRef({ x: 0, y: 0 })
    const posRef     = useRef({ x: 0, y: 0 })
    const cbRef      = useRef(onSwipeOff)
    const dirCbRef   = useRef(onDragDirection)
    const profileRef = useRef(profile)
    const lastDir    = useRef(null)

    useEffect(() => { cbRef.current      = onSwipeOff     }, [onSwipeOff])
    useEffect(() => { dirCbRef.current   = onDragDirection }, [onDragDirection])
    useEffect(() => { profileRef.current = profile         }, [profile])

    const reportDir = (dir) => {
        if (dir === lastDir.current) return
        lastDir.current = dir
        if (dirCbRef.current) dirCbRef.current(dir)
    }

    const getDir = (x, y) => {
        if (Math.abs(x) >= Math.abs(y)) return x > 0 ? 'right' : 'left'
        return y < 0 ? 'up' : 'down'
    }

    const triggerSwipe = (dir) => {
        setFlyDir(dir)
        setFlying(true)
        reportDir(dir)
        const uid = profileRef.current ? profileRef.current.uid : null
        setTimeout(() => {
            if (cbRef.current) cbRef.current(dir, uid)
            reportDir(null)
        }, 300)
    }

    useImperativeHandle(ref, () => ({ swipe: triggerSwipe }))

    // document-level mouse tracking so fast moves don't lose the drag
    useEffect(() => {
        const onMove = (e) => {
            if (!dragRef.current) return
            const p = { x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y }
            posRef.current = p
            setPos(p)
            if (Math.abs(p.x) > 20 || Math.abs(p.y) > 20) {
                reportDir(getDir(p.x, p.y))
            } else {
                reportDir(null)
            }
        }
        const onUp = () => {
            if (!dragRef.current) return
            dragRef.current = false
            setDragging(false)
            const { x, y } = posRef.current
            if (Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD) {
                triggerSwipe(getDir(x, y))
            } else {
                posRef.current = { x: 0, y: 0 }
                setPos({ x: 0, y: 0 })
                reportDir(null)
            }
        }
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup',   onUp)
        return () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup',   onUp)
        }
    }, [])

    const onMouseDown = (e) => {
        if (flying) return
        e.preventDefault()
        dragRef.current = true
        setDragging(true)
        startPos.current = { x: e.clientX, y: e.clientY }
        posRef.current   = { x: 0, y: 0 }
    }

    const onTouchStart = (e) => {
        if (flying) return
        const t = e.touches[0]
        dragRef.current  = true
        startPos.current = { x: t.clientX, y: t.clientY }
        posRef.current   = { x: 0, y: 0 }
    }

    const onTouchMove = (e) => {
        if (!dragRef.current) return
        const t = e.touches[0]
        const p = { x: t.clientX - startPos.current.x, y: t.clientY - startPos.current.y }
        posRef.current = p
        setPos(p)
        if (Math.abs(p.x) > 20 || Math.abs(p.y) > 20) {
            reportDir(getDir(p.x, p.y))
        } else {
            reportDir(null)
        }
    }

    const onTouchEnd = () => {
        if (!dragRef.current) return
        dragRef.current = false
        const { x, y } = posRef.current
        if (Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD) {
            triggerSwipe(getDir(x, y))
        } else {
            posRef.current = { x: 0, y: 0 }
            setPos({ x: 0, y: 0 })
            reportDir(null)
        }
    }

    const tx  = flying ? (flyDir === 'right' ? 800 : flyDir === 'left' ? -800 : 0) : pos.x
    const ty  = flying ? (flyDir === 'up' ? -800 : flyDir === 'down' ? 800 : 0) : pos.y
    const rot = flying
        ? (flyDir === 'right' ? 25 : flyDir === 'left' ? -25 : 0)
        : pos.x * 0.08

    const transition = flying   ? 'transform 0.3s ease-out'
                     : dragging ? 'none'
                     :            'transform 0.2s ease-out'

    if (!profile) return null

    return (
        <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
                transform:   `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                transition,
                cursor:      dragging ? 'grabbing' : 'grab',
                userSelect:  'none',
                touchAction: 'none',
            }}
        >
            <View style={styles.card}>
                <CircleAvatar uid={profile.uid} pic={profile.picture} size={280} />
                <Text style={styles.name}>{profile.first_name}</Text>
            </View>
        </div>
    )
})

export default Card

const styles = StyleSheet.create({
    card: {
        width: '300px',
        height: '340px',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        paddingTop: '10px',
    },
    name: {
        fontSize: '20px',
        fontWeight: '600',
        marginTop: '10px',
        color: '#333',
    },
})
