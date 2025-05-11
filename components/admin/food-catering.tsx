"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Edit, Plus, Upload } from "lucide-react"


const initialMenuItems = {
  breakfast: [
    { id: "b1", name: "Idli Sambar", price: 80, available: true },
    { id: "b2", name: "Poha", price: 60, available: true },
    { id: "b3", name: "Bread Omelette", price: 70, available: true },
    { id: "b4", name: "Aloo Paratha", price: 90, available: true },
    { id: "b5", name: "Upma", price: 60, available: false },
    { id: "b6", name: "Cornflakes with Milk", price: 50, available: true },
  ],
  lunch: [
    { id: "l1", name: "Veg Thali", price: 150, available: true },
    { id: "l2", name: "Non-Veg Thali", price: 180, available: true },
    { id: "l3", name: "Paneer Butter Masala", price: 140, available: true },
    { id: "l4", name: "Dal Makhani", price: 120, available: true },
    { id: "l5", name: "Chicken Curry", price: 160, available: false },
    { id: "l6", name: "Fish Curry", price: 170, available: true },
  ],
  dinner: [
    { id: "d1", name: "Veg Thali", price: 150, available: true },
    { id: "d2", name: "Non-Veg Thali", price: 180, available: true },
    { id: "d3", name: "Paneer Tikka Masala", price: 150, available: true },
    { id: "d4", name: "Dal Tadka", price: 110, available: true },
    { id: "d5", name: "Butter Chicken", price: 180, available: false },
    { id: "d6", name: "Mutton Curry", price: 200, available: true },
  ],
}

export function FoodCatering() {
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [activeTab, setActiveTab] = useState<keyof typeof menuItems>("breakfast")
  const [editingItem, setEditingItem] = useState<{
    id: string
    name: string
    price: number
    available: boolean
    mealType: keyof typeof menuItems
  } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    available: true,
  })

  const handleAvailabilityToggle = (mealType: keyof typeof menuItems, itemId: string) => {
    setMenuItems({
      ...menuItems,
      [mealType]: menuItems[mealType].map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item,
      ),
    })
  }

  const handleEditItem = (item: { id: string; name: string; price: number; available: boolean }, mealType: keyof typeof menuItems) => {
    setEditingItem({ ...item, mealType })
    setIsDialogOpen(true)
  }

  const handleAddNewItem = () => {
    setEditingItem(null)
    setNewItem({
      name: "",
      price: "",
      available: true,
    })
    setIsDialogOpen(true)
  }

  const handleSaveItem = () => {
    if (editingItem) {
      
      const { mealType, ...itemData } = editingItem
      setMenuItems({
        ...menuItems,
        [mealType]: menuItems[mealType].map((item) => (item.id === itemData.id ? itemData : item)),
      })
    } else {
      const newId = `${activeTab[0]}${Date.now()}`
      setMenuItems({
        ...menuItems,
        [activeTab]: [...menuItems[activeTab], { ...newItem, id: newId }],
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#002060]">Food & Catering Management</h2>
        <div className="flex space-x-2">
          <Button onClick={handleAddNewItem} className="bg-[#002060] hover:bg-[#003090]">
            <Plus className="mr-2" size={16} />
            Add Menu Item
          </Button>
          <Button variant="outline">
            <Upload className="mr-2" size={16} />
            Upload Menu
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Food Menu</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof menuItems)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>

            <TabsContent value="breakfast">
              <MenuTable
                items={menuItems.breakfast}
                onToggleAvailability={(itemId: string) => handleAvailabilityToggle("breakfast", itemId)}
                onEditItem={(item: { id: string; name: string; price: number; available: boolean }) => handleEditItem(item, "breakfast")}
              />
            </TabsContent>

            <TabsContent value="lunch">
              <MenuTable
                items={menuItems.lunch}
                onToggleAvailability={(itemId: string) => handleAvailabilityToggle("lunch", itemId)}
                onEditItem={(item: { id: string; name: string; price: number; available: boolean }) => handleEditItem(item, "lunch")}
              />
            </TabsContent>

            <TabsContent value="dinner">
              <MenuTable
                items={menuItems.dinner}
                onToggleAvailability={(itemId: string) => handleAvailabilityToggle("dinner", itemId)}
                onEditItem={(item: { id: string; name: string; price: number; available: boolean }) => handleEditItem(item, "dinner")}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={editingItem ? editingItem.name : newItem.name}
                onChange={(e) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, name: e.target.value })
                  } else {
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price">Price (₹)</Label>
              <Input
                id="item-price"
                type="number"
                value={editingItem ? editingItem.price : newItem.price}
                onChange={(e) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, price: Number.parseInt(e.target.value) || 0 })
                  } else {
                    setNewItem({ ...newItem, price: (Number.parseInt(e.target.value) || 0).toString() })
                  }
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="item-available"
                checked={editingItem ? editingItem.available : newItem.available}
                onCheckedChange={(checked) => {
                  if (editingItem) {
                    setEditingItem({ ...editingItem, available: checked })
                  } else {
                    setNewItem({ ...newItem, available: checked })
                  }
                }}
              />
              <Label htmlFor="item-available">Available</Label>
            </div>
            {!editingItem && (
              <div className="space-y-2">
                <Label htmlFor="meal-type">Meal Type</Label>
                <Select value={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof menuItems)}>
                  <SelectTrigger id="meal-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveItem} className="bg-[#002060] hover:bg-[#003090]">
              {editingItem ? "Update Item" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MenuTable({
  items,
  onToggleAvailability,
  onEditItem,
}: {
  items: { id: string; name: string; price: number; available: boolean }[]
  onToggleAvailability: (itemId: string) => void
  onEditItem: (item: { id: string; name: string; price: number; available: boolean }) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item Name</TableHead>
          <TableHead>Price (₹)</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>₹{item.price}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Switch checked={item.available} onCheckedChange={() => onToggleAvailability(item.id)} />
                <span>{item.available ? "Available" : "Unavailable"}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => onEditItem(item)}>
                <Edit size={16} />
                <span className="sr-only">Edit</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
