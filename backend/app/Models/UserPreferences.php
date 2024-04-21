<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;


class UserPreferences extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'preferences',
        'new_user_status',
    ];

    protected $casts = [
        'preferences' => 'json',
    ];

    // Lets define relationship with User model.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
